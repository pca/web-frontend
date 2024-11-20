import { navigate } from "gatsby"

const IndexPage = () => {
  // Redirect to regional-rankings in development
  if (typeof window !== "undefined") {
    navigate("/regional-rankings")
  }
  return null
}

export default IndexPage 