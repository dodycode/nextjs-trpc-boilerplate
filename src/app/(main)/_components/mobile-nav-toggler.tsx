import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MobileNavToggler: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <div className="flex gap-x-2 md:hidden">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="aspect-square p-2"
      >
        {open ? (
          <Icon type="close" className="size-4" />
        ) : (
          <Icon type="hamburgerMenu" className="size-4" />
        )}
      </Button>
    </div>
  );
};

export { MobileNavToggler };
