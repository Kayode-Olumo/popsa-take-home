import {
  StyledActions,
  ButtonLayout,
  ButtonMenu,
} from "./styles/actions.styles";
import { MinusIcon, MenuIcon } from "@/assets/icons/icons";

export default function Actions({ data }) {
  return (
    <>
      <StyledActions>
        <ButtonLayout>
          <MinusIcon />
        </ButtonLayout>
        <ButtonMenu>
          <MenuIcon />
        </ButtonMenu>
      </StyledActions>
    </>
  );
}
