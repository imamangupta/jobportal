import { PrettyChatWindow } from "react-chat-engine-pretty";

const ChatsPage = ({user}) => {
  return (
    <div style={{height:'100vh'}}>
      <PrettyChatWindow
        projectId='e9bd279e-8b53-4507-94f6-db36a94ec2b9'
        username={user.userName} // adam
        secret='secret' // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatsPage;
