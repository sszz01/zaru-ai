const Button = ({ Icon }: { Icon: React.ComponentType }) => (
  <button
    type="button"
    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cursor-pointer"
  >
    <Icon />
  </button>
);

export default Button;
