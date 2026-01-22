import { Button } from "../ui/button";

const LogoutButton = ({
  onClick,
  size = "default",
  variant = "destructive",
  className = "",
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      size={size}
      className={className}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
