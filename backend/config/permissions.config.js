const PERMISSIONS ={
    admin:[
        'update_student',
        'manage_users',
        'create_subject',
        'view_subjects',
        'update_subject',
        'delete_subject',
        'create_student',
        'view_students',
        'update_student',
        'delete_student',
        'create_faculty',
        'view_facultys',
        'update_faculty',
        'delete_faculty',
        'view-self',
        'update-self'
    ],
    faculty:[
        'view_subjects',
        'view_students',
        'update_subject',
        'update_student',
        'view-self',
        'update-self',
        'view_facultys'
        
    ],
    student:[
        
        'view_subjects',
        'assign_subject',
        'view-self',
        'update_subject',
        'view_students',
        'view_student',
        'update-self',

        'create_subject',
        'update_subject',
        'delete_subject'
    ],
}

module.exports=PERMISSIONS;