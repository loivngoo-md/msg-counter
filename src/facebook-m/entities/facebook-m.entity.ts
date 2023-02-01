import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('fb-click')
export class FacebookM {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false, default: '' })
    public ip: string;

    @Column({ nullable: false, default: '' })
    public id_fb: string;

    @Column({ nullable: false, default: '' })
    public url: string;

    @CreateDateColumn()
    public created_at: Date
}

