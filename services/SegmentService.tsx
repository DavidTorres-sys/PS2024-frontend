import { ISegment } from "@/common.types";
import { environment } from "@/enviroments/environment";

const handleResponse = async (res: Response): Promise<any> => {
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error ${res.status}: ${error}`);
  }
  return res.json();
};

export const getAllSegments = async (): Promise<ISegment[]> => {
  const res = await fetch(`${environment.API_URL}/segments`);
  return handleResponse(res);
};

export const getSegmentById = async (id: number): Promise<ISegment> => {
  const res = await fetch(`${environment.API_URL}/segments/${id}`);
  return handleResponse(res);
};

export const createSegment = async (segment: Omit<any, "id">): Promise<ISegment> => {
  const res = await fetch(`${environment.API_URL}/segments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(segment),
  });
  return handleResponse(res);
};

export const updateSegment = async (id: number, segment: Omit<ISegment, "id">): Promise<ISegment> => {
  const res = await fetch(`${environment.API_URL}/segments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(segment),
  });
  return handleResponse(res);
};

export const deleteSegment = async (id: number): Promise<void> => {
  const res = await fetch(`${environment.API_URL}/segments/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error ${res.status}: ${error}`);
  }
};
