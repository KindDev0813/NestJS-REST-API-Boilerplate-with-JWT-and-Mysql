import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../src/domains/users/users.controller';
import { UsersService } from '../../../src/domains/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersSerice = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersSerice)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {
      name: 'saray',
      password: '123456',
      username: 'chaksaray',
    };
    await expect(controller.createUsers(dto)).resolves.toEqual({
      id: expect.any(Number),
      ...dto,
    });

    expect(mockUsersSerice.create).toHaveBeenCalledWith(dto);
  });

  it('should update a user', async () => {
    const dto = {
      name: 'saray01',
      password: '123456',
      username: 'chaksaray',
    };

    await expect(controller.uppdateUser(1, dto)).resolves.toEqual({
      id: 1,
      ...dto,
    });

    expect(mockUsersSerice.update).toHaveBeenCalled();
  });
});
