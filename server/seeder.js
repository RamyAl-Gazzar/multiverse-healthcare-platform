import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Domain from './models/Domain.js';
import Standard from './models/Standard.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const seedGaharData = async () => {
    try {
        await Domain.deleteMany();
        await Standard.deleteMany();

        const domains = [
            {
                name: 'Patient Safety',
                code: 'PSR',
                weight: 20,
                description: 'Standards related to patient safety requirements.'
            },
            {
                name: 'Patient-Centered Care',
                code: 'PCC',
                weight: 15,
                description: 'Focus on patient rights and engagement.'
            },
            {
                name: 'Governance & Leadership',
                code: 'GLD',
                weight: 10,
                description: 'Leadership accountability and strategic direction.'
            }
        ];

        const createdDomains = await Domain.insertMany(domains);
        console.log('Domains Seeded');

        // Map domain IDs
        const psrId = createdDomains.find(d => d.code === 'PSR')._id;
        const pccId = createdDomains.find(d => d.code === 'PCC')._id;
        const gldId = createdDomains.find(d => d.code === 'GLD')._id;

        const standards = [
            {
                domain: psrId,
                code: 'PSR.01',
                title: 'Patient Identification',
                description: 'The hospital has a strict process for identifying patients.',
                maxScore: 3,
                isMandatory: true
            },
            {
                domain: psrId,
                code: 'PSR.02',
                title: 'High Alert Medications',
                description: 'Management of high-alert medications to prevent errors.',
                maxScore: 3,
                isMandatory: true
            },
            {
                domain: pccId,
                code: 'PCC.01',
                title: 'Patient Rights',
                description: 'The facility defines and protects patient rights.',
                maxScore: 3,
                isMandatory: false
            },
            {
                domain: gldId,
                code: 'GLD.01',
                title: 'Strategic Planning',
                description: 'The governing body approves the strategic plan.',
                maxScore: 3,
                isMandatory: true
            }
        ];

        await Standard.insertMany(standards);
        console.log('Standards Seeded');

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedGaharData();
