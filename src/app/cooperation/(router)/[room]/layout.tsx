export default function CooperationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className=" flex w-[100vw] h-[100vh] overflow-hidden">{children}</div>;
}
