import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleTheme } from "../redux/ThemaSlice";

const ThemeButton = () => {
  const dispatch = useDispatch();
  const { theme, currentTheme } = useSelector((state: RootState) => state.theme);

  return (
    <button
      style={{ background: theme.background, color: theme.text }}
      onClick={() => dispatch(toggleTheme())}
    >
      Toggle Theme ({currentTheme})
    </button>
  );
};

export default ThemeButton;