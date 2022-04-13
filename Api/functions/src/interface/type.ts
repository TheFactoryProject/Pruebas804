
export interface newEcom  {
    
    //data
    id_ecom: string,
    fecha_ecom: string,
    hora_ecom: string,

    //sanidad
    temperatura_ecom?: string,
    
    //accelerometro
    acc_x_ecom?: string, 
    acc_y_ecom?: string,
    acc_z_ecom?: string,

    //Giroscopio
    giro_x_ecom?: string,
    giro_y_ecom?: string,
    giro_z_ecom?: string,

    //Evo
    evo_asignado?: string,
    date_ecom: string
    
};

export interface newEvo  {
    
    //data
    id_evo: string,
    fecha_evo?: string,
    hora_evo?: string,

    //sanidad
    temperatura_evo?: string,
    
    //accelerometro
    acc_x_evo?: string, 
    acc_y_evo?: string,
    acc_z_evo?: string,

    //Giroscopio
    giro_x_evo?: string,
    giro_y_evo?: string,
    giro_z_evo?: string,

    //pm
    pm100?: string,
    pm25?: string,
    pm10?: string,

    //Ecom y sensor evoo
    ecom_asignado?: string,
    id_sensor?: string,  
    date_evo: string
};

export interface newGPS {
    latitud?: string,
    longitud?: string,
    altitud?: string,
    velocidad?: string,
    fecha_gps?: string,
    hora_gps?: string,
    id_ecom: string
    date_gps: string
}

