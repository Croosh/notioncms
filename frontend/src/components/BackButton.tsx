import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="btn btn-circle absolute top-5 left-5  bg-white/40 p-2 rounded-full "
    >
      <ArrowLeft />
    </button>
  );
}

export default BackButton;
