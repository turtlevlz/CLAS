type DirectorySearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function DirectorySearchInput({
  value,
  onChange,
}: DirectorySearchInputProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="directory-search-input">
      <label className="directory-field-label" htmlFor="directory-search">
        Buscar miembros
      </label>
      <input
        id="directory-search"
        type="search"
        value={value}
        onChange={handleChange}
        className="directory-input"
        placeholder="Buscar por empresa, ciudad, categoría o especialidad"
        aria-label="Buscar miembros por empresa, ciudad, categoría o especialidad"
      />
    </div>
  );
}
