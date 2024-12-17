import React from "react";

const Heading = ({
  children,
  id,
  level,
}: {
  children: React.ReactNode;
  id: string;
  level: number;
}) => {
  switch (level) {
    case 1:
      return <FirstHeading children={children} id={id} />;
    case 2:
      return <SecondHeading children={children} id={id} />;
    case 3:
      return <ThirdHeading children={children} id={id} />;
    case 4:
      return <FourthHeading children={children} id={id} />;
    default:
      return (
        <p id={id} className="text-gray-900 dark:text-gray-100">
          {children}
        </p>
      );
  }
};

const FirstHeading = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <h1 id={id} className="text-gray-900 dark:text-gray-100">
      {children}
    </h1>
  );
};

const SecondHeading = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <h2 id={id} className="text-gray-900 dark:text-gray-100">
      {children}
    </h2>
  );
};

const ThirdHeading = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <h3 id={id} className="text-gray-900 dark:text-gray-100">
      {children}
    </h3>
  );
};

const FourthHeading = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <h4 id={id} className="text-gray-900 dark:text-gray-100">
      {children}
    </h4>
  );
};

export default Heading;
