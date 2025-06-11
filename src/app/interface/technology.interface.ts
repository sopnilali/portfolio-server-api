export interface ITechnology {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTechnology {
  name: string;
}

export interface IUpdateTechnology {
  name?: string;
} 