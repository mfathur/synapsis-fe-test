import { useFormStatus } from "react-dom";

type Props = {
  type: "add" | "edit";
};

const FormBtnSubmit = ({ type }: Props) => {
  const { pending } = useFormStatus();

  const textAdd = pending ? "Adding..." : "Add";
  const textEdit = pending ? "Saving..." : "Save";

  const text = type === "add" ? textAdd : textEdit;

  return (
    <button
      type="submit"
      className="btn_contained rounded-lg px-5 py-2  mb-1 text-center self-end"
    >
      {text}
    </button>
  );
};

export default FormBtnSubmit;
