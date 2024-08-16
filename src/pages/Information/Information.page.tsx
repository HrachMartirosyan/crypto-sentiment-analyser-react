import { Typography } from "book-ui";

export const InformationPage = () => {
  // const [activeTab, setActiveTab] = useState<"content" | "comments">("content");

  return (
    <>
      <Typography component="h1" variant="h3">
        Information
      </Typography>
      <br />

      {/*<br />*/}
      {/*<ButtonGroup>*/}
      {/*  <Button onClick={() => setActiveTab("content")}>Content</Button>*/}
      {/*  <Button onClick={() => setActiveTab("comments")}>Comments</Button>*/}
      {/*</ButtonGroup>*/}
      {/*<br />*/}

      {/*{activeTab === "content" && <Typography>Info about Content</Typography>}/*/}
      {/*{activeTab === "comments" && <Typography>Info about Comments</Typography>}*/}

      <Typography>
        ‘Content’, also referred to as “Post’, refers to the original content
        topic, which then elicits a number of “Comments’
      </Typography>
      <br />
      <Typography>
        The comments often have little relationship with the content and title.
        The data is replete with these threads which are tangential to the
        original content. Thus, a positive comment in a thread may or may not be
        related to the original post (content).
      </Typography>
      <br />

      <Typography>
        Reddit comments are structured as a tree, where each comment can have a
        reply thread, which can have other reply leaves. The replies can be
        tangential and should, but are not, be construed as the start of a new
        post. To save bandwidth and expedite loading, reddit only loads a subset
        of comments and replaces deeper levels with ‘More Comments” objects.
      </Typography>
      <br />

      <Typography>
        Some periods had no content and comments (one quarter for AMC and three
        non-consecutive quarters for GameStop), whereas there was a plethora of
        communication in other time periods (see web scraping section). This
        could have been a result of the particular security ( stock or crypto),
        or subject to restricted trading, or being out of favour in the
        particular period, or that another subreddit or alternative social media
        site became more popular.
      </Typography>
      <br />

      <Typography>
        If the user approves of a post or comment, the user can upvote which
        increments the score. If the post or comment is not found to be
        additive, the user can downvote to register disapproval, which
        decrements the score. The score is the net result of upvotes less
        downvotes, subject to the ‘floor’. Though Reddit employs measures to
        inhibit users from multiple score votes on a particular post or comment,
        the user can vote from multiple accounts. Scores are also susceptible to
        AI bot manipulation.
      </Typography>
    </>
  );
};
