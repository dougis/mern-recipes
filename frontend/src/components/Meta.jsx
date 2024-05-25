import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Leigh's recipes",
  description: "Good food, good mood!",
  keywords: "recipes, food, cooking, baking, healthy, delicious, tasty, yummy"
};
export default Meta;
