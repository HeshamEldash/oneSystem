import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";

function useContextMenu(targetId) {
  const [contextData, setContextData] = useState({
    visible: false,
    posX: 0,
    posY: 0,
  });
  const contextRef = useRef(null);

  const contextMenuEventHandler = useCallback(
    (event) => {
      const targetElement = document.getElementById(targetId);

      if (contextData.visible === true) {
        event.preventDefault();

        setContextData({ ...contextData, visible: false });

      } else if (targetElement && targetElement.contains(event.target)) {
        event.preventDefault();

        setContextData({
          visible: true,
          posX: event.clientX,
          posY: event.clientY,
        });
      } else if (
        contextRef.current &&
        !contextRef.current.contains(event.target)
      ) {
        setContextData({ ...contextData, visible: false });

      }
    },
    
    [contextData]
  );

  const offClickHandler = useCallback(
    (event) => {
    setContextData({ ...contextData, visible: false });
    },
    [contextData]
  );



  useEffect(() => {
    document.addEventListener("contextmenu", contextMenuEventHandler);
    document.addEventListener("click", offClickHandler);

    return () => {
      document.removeEventListener("contextmenu", contextMenuEventHandler);
      document.removeEventListener("click", offClickHandler);
    };
  }, [contextData, targetId]);

  useLayoutEffect(() => {
    if (
      contextData.posX + contextRef.current?.offsetWidth >
      window.innerWidth
    ) {
      setContextData({
        ...contextData,
        posX: contextData.posX - contextRef.current?.offsetWidth,
      });
    }
    if (
      contextData.posY + contextRef.current?.offsetHeight >
      window.innerHeight
    ) {
      setContextData({
        ...contextData,
        posY: contextData.posY - contextRef.current?.offsetHeight,
      });
    }
  }, [contextData]);

  return { contextData, contextRef };

  // const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  // const [show, setShow] = useState(false);
  // const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  // const handleContextMenu = useCallback(
  //   (event) => {
  //     console.log(event)
  //     event.preventDefault();
  //     setAnchorPoint({ x: event.pageX, y: event.pageY });
  //     setShow(true);

  //   },
  //   [setAnchorPoint, setShow]
  // );

  // useEffect(() => {

  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("click", handleClick);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, []);

  // return { anchorPoint, show };
}

export default useContextMenu;
