const VideoYoutube = () => {
  return (
    <iframe
      style={{
        marginTop: '0px',
        maxWidth: 'initial',
        transitionProperty: 'opacity',
        transitionDuration: '1000ms',
        pointerEvents: 'none',
        width: '100%',
        height: '300px',
        transform: 'scale(1.2)',
      }}
      frameBorder="0"
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      title="fitness backfsgsfgsfgsfgsfground video"
      width="1360"
      height="765"
      src="https://www.youtube.com/embed/p2Kkxw6twjg?autoplay=1&mute=0&controls=0&enablejsapi=1&allowfullscreen=true&iv_load_policy=3&modestbranding=1&origin=https%3A%2F%2Fa.mobirise.com&rel=0&mode=transparent&showinfo=0&html5=1&version=3&playerapiid=iframe_YTP_1624972482514&widget_referrer=https%3A%2F%2Fa.mobirise.com%2F&widgetid=1"
    ></iframe>
  );
};

export default VideoYoutube;
