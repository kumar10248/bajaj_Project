import ReactMarkdown from "react-markdown";

interface ScriptShowProps {
    scriptContent: string
}

const ScriptShow = (props: ScriptShowProps) => {
    const {scriptContent} = props
    return (
        <ReactMarkdown className="script-container">{scriptContent}</ReactMarkdown>
    );
}

export default ScriptShow