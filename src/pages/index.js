import { navigate } from "gatsby"

const IndexPage = () => {
  // Redirect to regional-rankings in development
  if (typeof window !== "undefined") {
    // Track page view before navigation
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Home',
        page_location: window.location.href,
        page_path: '/'
      });
    }
    navigate("/regional-rankings")
  }
  return null
}

export default IndexPage 