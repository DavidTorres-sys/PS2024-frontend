
export type ISegment = {
    id: number,
    segment_number: number,
    nomenclature: string,
    length: number,
    created_at: Date,
    updated_at: Date,
    roads: IRoad[],
    curbs: ICurbs[],
}

export type IRoad = {
    id: number,
    segment_id: number,
    pavement_type: string,
    length: number,
    created_at: Date,
    updated_at: Date,
}

export type ICurbs = {
    id: number,
    segment_id: number,
    material: string,
    length: number,
    created_at: Date,
    updated_at: Date,

}