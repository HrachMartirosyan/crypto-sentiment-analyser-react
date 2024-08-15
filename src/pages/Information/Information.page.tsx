import { Typography, ButtonGroup, Button } from "book-ui";
import { useState } from "react";

export const InformationPage = () => {
  const [activeTab, setActiveTab] = useState<"content" | "comments">("content");

  return (
    <>
      <Typography component="h1" variant="h3">
        Information
      </Typography>
      <br />
      <ButtonGroup>
        <Button onClick={() => setActiveTab("content")}>Content</Button>
        <Button onClick={() => setActiveTab("comments")}>Comments</Button>
      </ButtonGroup>
      <br />

      {activeTab === "content" && <Typography>Info about Content</Typography>}
      {activeTab === "comments" && <Typography>Info about Comments</Typography>}
    </>
  );
};
