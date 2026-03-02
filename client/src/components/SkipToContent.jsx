const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-accent focus:text-primary focus:rounded-btn focus:font-bold focus:shadow-xl"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
