import {startOfHour} from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({date, provider}: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppoinmentInSameDate = this.appointmentRepository.findByDate(appointmentDate);

    if (findAppoinmentInSameDate) {
      throw Error('This appointment is alredy booked');
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
