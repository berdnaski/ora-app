export type ChurchProfile = {
    id: string;
    churchId: string;
    cep: string;
    street: string;
    number: string;
    district: string;
    city: string;
    complement?: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type Church = {
    id: string;
    name: string;
    code: string;
    photo?: string | null;
    createdAt: Date;
    updatedAt: Date;
    profile: ChurchProfile;
}

export type CreateChurchProfile = {
    cep: string;
    street: string;
    number: string;
    district: string;
    city: string;
    complement?: string | null;
};

export type CreateChurchInput = {
    name: string;
    code: string;
    photo?: string | null;
    profile: CreateChurchProfile;
}