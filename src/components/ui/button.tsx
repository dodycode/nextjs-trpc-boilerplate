import * as React from "react";

import { cn } from "@/lib/utils";

import type { ButtonBaseProps } from "./button-base";
import type { IconType } from "./icons";
import { ButtonBase } from "./button-base";
import { Icon } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export { buttonVariants, type ButtonBaseProps } from "./button-base";

interface ButtonProps extends ButtonBaseProps {
  tooltipText?: string;
  tooltipSide?: "top" | "bottom" | "left" | "right";
  tooltipDelayDuration?: number;
  RightIcon?: IconType;
  rightIconClassName?: string;
  LeftIcon?: IconType;
  leftIconClassName?: string;
}

const ButtonContent = ({
  isLoading,
  children,
  RightIcon,
  rightIconClassName,
  LeftIcon,
  leftIconClassName,
}: Pick<
  ButtonProps,
  | "LeftIcon"
  | "RightIcon"
  | "children"
  | "isLoading"
  | "leftIconClassName"
  | "rightIconClassName"
>) => (
  <>
    {LeftIcon && !isLoading ? (
      <Icon type={LeftIcon} className={cn("size-4", leftIconClassName)} />
    ) : null}

    {isLoading ? <Icon type="spinner" className="size-4" /> : null}

    {children}

    {RightIcon && !isLoading ? (
      <Icon
        type={RightIcon}
        className={cn("size-4", { "ml-2": !!children }, rightIconClassName)}
      />
    ) : null}
  </>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      tooltipText,
      tooltipSide = "top",
      tooltipDelayDuration,
      RightIcon,
      rightIconClassName,
      LeftIcon,
      leftIconClassName,
      children,
      ...buttonBaseProps
    },
    ref,
  ) => {
    const button = (
      <ButtonBase ref={ref} {...buttonBaseProps}>
        <ButtonContent
          LeftIcon={LeftIcon}
          RightIcon={RightIcon}
          isLoading={buttonBaseProps.isLoading}
          rightIconClassName={rightIconClassName}
          leftIconClassName={leftIconClassName}
        >
          {children}
        </ButtonContent>
      </ButtonBase>
    );

    if (tooltipText) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={tooltipDelayDuration}>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side={tooltipSide}>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  },
);

Button.displayName = "Button";

export { Button, type ButtonProps };
