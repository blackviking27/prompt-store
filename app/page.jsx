import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share Prompts
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          AI promtps for everyone
        </span>
      </h1>
      <p className="desc text-center">
        PromptStore is an open source Ai prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
