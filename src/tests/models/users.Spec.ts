import { User, userModel } from '../../models/users';

const userStore = new userModel();

const user: User = {
    id: 0,
    email: 'abdelmonem@gmail.com',
    user_name: 'abdelmonem_88',
    first_name: 'abdelmonem',
    last_name: 'mohamed',
    password: '123456789',
};

describe('user model tests', () => {
    it('user model must have a create method', () => {
        expect(userStore.create).toBeDefined();
    });
    it('test create a user using new user details', async () => {
        const createdUser = await userStore.create(user);
        if (createdUser.id) {
            user.id = createdUser.id;
        }
        expect({
            email: createdUser.email,
            user_name: createdUser.user_name,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
        }).toEqual({
            email: user.email,
            user_name: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
        });
    });

    it('user model must have an index method', () => {
        expect(userStore.index).toBeDefined();
    });

    it('user model must have a show method', () => {
        expect(userStore.show).toBeDefined();
    });

    it('get single user using user id', async () => {
        const singleUser = await userStore.show(user.id as unknown as number);
        expect({
            email: singleUser.email,
            user_name: singleUser.user_name,
            first_name: singleUser.first_name,
            last_name: singleUser.last_name,
        }).toEqual({
            email: user.email,
            user_name: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
        });
    });
});
