//form
export interface FormProps{
  value?:string,
  id?:string,
  method:string,
}
export interface viewTableProps{
  value:string,
}
export interface LineGraphProps{
lineIncomes:Array<{
  income_amount: number,
  income_category?: string,
  income_description?: string,
  income_date: string,
}>,
lineExpenses:Array<{
  expense_amount: number,
  expense_category?: string,
  expense_description?: string,
  expense_date: string,
}>,
}

export interface LoginSignupFormProps{
  formType:string,
}


export interface ProtectedRouteProps{
  element:React.ReactElement,
  path:string,
}
export interface SidebarProps {
  isHamburger: boolean;
  setIsHamburger: React.Dispatch<React.SetStateAction<boolean>>;
}