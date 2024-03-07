export type Model = 'mistral:7b' | 'text-davinci-003' | 'llama2';

export interface DropDownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
