import { Button } from "../ui/button";

const LogoutButton = ({ onClick, size = "default", variant = "destructive" }) => {
  return (
    <Button variant={variant} onClick={onClick} size={size}>
      Logout
    </Button>
  );
};

export default LogoutButton;
