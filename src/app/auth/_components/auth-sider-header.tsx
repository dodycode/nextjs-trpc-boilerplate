interface Props {
  headingText?: string;
  subHeadingText?: string;
}

const AuthSiderHeader: React.FC<Props> = ({
  headingText = "Login to your account",
  subHeadingText = "Fill in you email and password",
}) => {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-2xl font-bold">{headingText}</h1>
      <p className="text-muted-foreground text-sm text-balance">
        {subHeadingText}
      </p>
    </div>
  );
};
export { AuthSiderHeader };
