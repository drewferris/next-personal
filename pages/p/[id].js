import Layout from "../../components/MyLayout";
import fetch from "isomorphic-unfetch";
import Markdown from "react-markdown";

const Post = props => (
  <Layout>
    <div className='markdown'>
      <h1>{props.show.name}</h1>
      <p>{props.show.summary.replace(/<[/]?[pb]>/g, "")}</p>
      {props.show.image ? <img src={props.show.image.medium} /> : null}
    </div>
    <style jsx global>{`
      .markdown a {
        text-decoration: none;
        color: blue;
      }

      .markdown a:hover {
        opacity: 0.6;
      }

      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
    `}</style>
  </Layout>
);

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;
