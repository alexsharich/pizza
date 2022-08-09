import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="130" r="130" /> 
    <rect x="86" y="301" rx="0" ry="0" width="1" height="0" /> 
    <rect x="32" y="317" rx="0" ry="0" width="2" height="0" /> 
    <rect x="174" y="451" rx="0" ry="0" width="1" height="0" /> 
    <rect x="123" y="313" rx="0" ry="0" width="4" height="4" /> 
    <rect x="0" y="299" rx="15" ry="15" width="280" height="24" /> 
    <rect x="7" y="361" rx="0" ry="0" width="280" height="80" /> 
    <rect x="4" y="454" rx="16" ry="16" width="95" height="75" /> 
    <rect x="129" y="458" rx="16" ry="16" width="1152" height="46" />
  </ContentLoader>
)

export default PizzaSkeleton