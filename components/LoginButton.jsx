export default function LoginButton({ socialNetwork, Icon }) {
  return (
    <button className="hover:bg-slate-100 grid w-full grid-cols-[2rem_1fr] items-center justify-center rounded-md border border-gray-300 p-3">
      <Icon className="text-2xl" />
      <span>Continue with {socialNetwork}</span>
    </button>
  );
}
