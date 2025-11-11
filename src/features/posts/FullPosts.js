import { useCallback, useEffect, useRef } from "react";
import { Post } from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, setCurrentPage } from "../../redux/reducerActions";
import { Virtuoso } from "react-virtuoso";
import { useLocation } from "react-router-dom";
import LoaderSpinner from "../../components/LoaderSpinner";

export const Posts = () => {
  const location = useLocation();
  const virtuosoRef = useRef(null);
  const dispatch = useDispatch();
  const hasRestored = useRef(false);
  const savedScroll = useRef(0);
  const loadingRef = useRef(false);
  const isInitialMount = useRef(true);

  const {
    posts = [],
    isLoading,
    error,
    totalPages = 1,
    currentPage = 1,
  } = useSelector((state) => state.posts || {});

  // Initial fetch
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (!posts.length) dispatch(getPosts(currentPage));
    }
  }, []);

  // Save scroll position every 300ms
  useEffect(() => {
    const key = `scroll-${location.pathname}`;
    const interval = setInterval(() => {
      if (virtuosoRef.current) {
        virtuosoRef.current.getState((state) => {
          sessionStorage.setItem(key, state.scrollTop.toString());
        });
      }
    }, 300);
    return () => clearInterval(interval);
  }, [location.pathname]);

  // Load saved scroll position
  useEffect(() => {
    const key = `scroll-${location.pathname}`;
    const pos = parseInt(sessionStorage.getItem(key) || "0", 10);
    savedScroll.current = pos;
    hasRestored.current = false; // reset on route change
  }, [location.pathname]);

  // Restore scroll smoothly once Virtuoso is ready
  const handleRangeChanged = useCallback(() => {
    if (!hasRestored.current && savedScroll.current && virtuosoRef.current) {
      virtuosoRef.current.scrollTo({ top: savedScroll.current });
      hasRestored.current = true;
    }
  }, []);

  // Infinite scroll
  const loadMore = useCallback(() => {
    if (loadingRef.current || isLoading || totalPages <= currentPage) return;
    loadingRef.current = true;

    const nextPage = currentPage + 1;
    dispatch(setCurrentPage(nextPage));
    dispatch(getPosts(nextPage)).finally(() => {
      loadingRef.current = false;
    });
  }, [isLoading, totalPages, currentPage, dispatch]);

  return (
    <div className="posts max-w-screen-sm m-auto">
      {error && <p className="text-red-500">{error.message || error}</p>}

      <Virtuoso
        ref={virtuosoRef}
        useWindowScroll
        data={posts}
        endReached={loadMore}
        overscan={300}
        increaseViewportBy={{ top: 300, bottom: 300 }}
        rangeChanged={handleRangeChanged}
        components={{
          Footer: () =>
            isLoading ? (
              <LoaderSpinner />
            ) : null,
        }}
        itemContent={(index, post) => (
          <Post
            key={post.id}
            id={post.id}
            userId={post.author?.id}
            profileImg={post.author?.profile_image}
            userName={post.author?.username}
            name={post.author?.name}
            bodyImg={post.image}
            createdAt={post.created_at}
            title={
              post.title?.length > 50
                ? post.title.slice(0, 50) + "....."
                : post.title
            }
            body={
              post.body?.length > 80
                ? post.body.slice(0, 80) + "....."
                : post.body
            }
            commentsCount={post.comments_count}
            tags={post.tags}
          />
        )}
      />
    </div>
  );
};
