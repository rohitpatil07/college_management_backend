import { Router } from 'express';
import filterRoutes from './filterRoutes.js';
import formRoutes from './formRoutes.js';
import downloadRoutes from './downloadRoutes.js';
import deleteRoutes from './deleteRoutes.js';
import prisma from '../../config/prisma.js';

const router = Router();

router.use('/filter', filterRoutes);
router.use('/form', formRoutes);
router.use('/download', downloadRoutes);
router.use('/delete', deleteRoutes);

router.post('/test', async (req, res) => {
  try {
    const { division, batch, department } = req.body;

    //suppose we make a call to retrieve student roll nos and get rollno and prep data like below

    const student_data = [
      {
        student: {
          connect: {
            roll_no: '19IT2023',
          },
        },
      },
    ];

    //prep the object while creating subject as

    const response = await prisma.subjects.create({
      data: {
        subject_id: 'IT802',
        subject_name: 'CC',
        semester: 8,
        department: 'IT',
        batch: 2019,
        type: 'MD',
        students: {
          create: student_data,
        },
      },
    });

    console.log(response);

    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

export default router;
