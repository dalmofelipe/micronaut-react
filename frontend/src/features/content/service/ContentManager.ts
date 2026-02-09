import type { ICreateContentRequest } from '../types/Content';
import * as ContentRepository from './ContentRepository';

export const getAllContents = async () => {
    return ContentRepository.getAll();
};

export const getContentById = async (id: number) => {
    return ContentRepository.getById(id);
};

export const createContent = async (data: ICreateContentRequest) => {
    return ContentRepository.create(data);
};

export const updateContent = async (id: number, data: Partial<ICreateContentRequest>) => {
    return ContentRepository.update(id, data);
};

export const deleteContent = async (id: number) => {
    return ContentRepository.remove(id);
};

export const uploadMedia = async (file: File) => {
    return ContentRepository.uploadMedia(file);
};