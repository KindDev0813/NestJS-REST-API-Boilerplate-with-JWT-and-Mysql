import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../../src/domains/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersEntity } from '../../../src/domains/users/entities/users.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockUsers = [
    {
      id: 1,
      name: 'saray',
      password: '123456',
      username: 'chaksaray',
    },
  ];

  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(UsersEntity))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/user (GET)', async () => {
    return request(await app.getHttpServer())
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200, mockUsers);
  });

  it('/user (POST)', async () => {
    const dto = {
      name: 'Bob',
      password: '123456',
      username: 'bobmarley',
    };
    return request(await app.getHttpServer())
      .post('/user')
      .send(dto)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          ...dto,
        });
      });
  });

  it('/user (POST) --> 400 on validation error', async () => {
    const dto = {
      name: 1234,
      password: '123456',
      username: 'bobmarley',
    };
    return request(await app.getHttpServer())
      .post('/user')
      .send(dto)
      .expect('Content-Type', /json/)
      .expect(400, {
        statusCode: 400,
        message: [
          'name must be shorter than or equal to 25 characters',
          'name must contain only letters and numbers',
          'name must be a string',
        ],
        error: 'Bad Request',
      });
  });
});
