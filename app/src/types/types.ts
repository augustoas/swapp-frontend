export type SvgIcon = {
    name: string,
    path: string,
}

export type TopSectionItem = {
    name: string,
    icon: SvgIcon,
    number: number | string,
};

export type Appointment = {
    name: string,
    email: string,
    date: string,
    visit_time: string,
    doctor: string,
    condition: string,
};