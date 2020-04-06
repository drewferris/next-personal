import Layout from "../components/MyLayout";
import fetch from "isomorphic-unfetch";
import { useState } from "react";

export default function FindLinks() {
  const [link, setLink] = useState("");
  const [selector, setSelector] = useState("");

  function fetcher(url) {
    return fetch(url, {}).then((r) => r.json());
  }

  const handleChange = (type) => (event)  => {
    if (type === "link") {
      setLink(event.target.value);
    } else {
      setSelector(event.target.value);
    }
  };

  const handleSubmit = () => {
    fetcher(`/api/process?link=${link}&selector=${selector}`);
  };

  return (
    <Layout>
      <h1>Find Links</h1>
      <label>
        Link:
        <input type="text" value={link} onChange={handleChange("link")} />
      </label>
      <label>
        Selector:
        <input
          type="text"
          value={selector}
          onChange={handleChange("selector")}
        />
      </label>
      <button className="submit" onClick={handleSubmit}>
        Submit
      </button>
      <style jsx>{`
        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  );
}
