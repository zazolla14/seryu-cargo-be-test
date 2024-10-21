interface Request {
  page_size: number;
  current: number;
  month: string;
  year: string;
  driver_code: string;
  status: string;
  name: string;
}

interface Response {
  driver_code: string;
  name: string;
  total_pending: number;
  total_confirmed: number;
  total_paid: number;
  total_attendance_salary: number;
  total_salary: number;
  count_shipment: number;
}

export { Request, Response };
