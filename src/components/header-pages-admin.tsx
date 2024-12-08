interface HeaderPagesAdminProps {
  title: string;
}

export function HeaderPagesAdmin({ title }: HeaderPagesAdminProps) {
  return (
    <header className="flex w-full min-w-full justify-center px-4">
      <h1 className="text-3xl font-bold w-full text-center">{title}</h1>
    </header>
  );
}
