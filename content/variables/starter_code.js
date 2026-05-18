import MonacoEditorClient from "@components/MonacoEditorClient";

export default function StarterCode() {
    return <MonacoEditorClient value={`let x = 10, y = 20, z = 30;\nconsole.log(x, y, z);`} />

}