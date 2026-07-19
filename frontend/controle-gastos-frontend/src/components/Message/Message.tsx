import "./Message.css";

type MessageProps = {
    type: "success" | "error";
    text: string;
};

function Message({
    type,
    text
}: MessageProps) {

    return (

        <div className={`message ${type}`}>
            {text}
        </div>
    );
}

export default Message;