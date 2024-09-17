'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createSegment } from '@/services/SegmentService';
import { useRouter } from 'next/navigation';

const CreateSegmentForm: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const currentDate = new Date().toISOString();

	const onFinish = async (values: { segment_number: number; nomenclature: string; length: number; roads: any[]; curbs: any[] }) => {
		setLoading(true);
		try {
			const segmentData = {
				segmentNumber: values.segment_number,
				nomenclature: values.nomenclature,
				length: values.length,
				roads: values.roads?.map(road => ({
					...road,
					createdAt: currentDate,
					updatedAt: currentDate
				})) || [],
				curbs: values.curbs?.map(curb => ({
					...curb,
					createdAt: currentDate,
					updatedAt: currentDate
				})) || [],
				createdAt: currentDate,
				updatedAt: currentDate
			};

			await createSegment(segmentData);

			message.success('Segment created successfully!');
			router.push('/segments');
		} catch (error) {
			message.error('Failed to create segment. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', maxWidth: '900px', margin: '0 auto', marginTop: '5em' }}>
			<Form layout="vertical" onFinish={onFinish} className='mt-10'>
				<Form.Item
					label="Numero de Segmento"
					name="segment_number"
					rules={[{ required: true, message: 'Please input the segment number!' }]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item
					label="Nomenclatura"
					name="nomenclature"
					rules={[{ required: true, message: 'Please input the nomenclature!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Largo"
					name="length"
					rules={[{ required: true, message: 'Please input the length!' }]}
				>
					<Input type="number" />
				</Form.Item>

				{/* Roads Input */}
				<Form.List name="roads">
					{(fields, { add, remove }) => (
						<>
							<label>Roads</label>
							{fields.map(({ key, name, fieldKey, ...restField }) => (
								<Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="start">
									<Form.Item
										{...restField}
										name={[name, 'pavementType']}
										fieldKey={[fieldKey || '', 'pavementType']}
										rules={[{ required: true, message: 'Please input pavement type!' }]}
									>
										<Input placeholder="Tipo de pavimento" />
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, 'length']}
										fieldKey={[fieldKey || '', 'length']}
										rules={[{ required: true, message: 'Please input road length!' }]}
									>
										<Input placeholder="Largo" type="number" />
									</Form.Item>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							))}
							<Form.Item>
								<Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
									Añadir Calzada
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>

				{/* Curbs Input */}
				<Form.List name="curbs">
					{(fields, { add, remove }) => (
						<>
							<label>Curbs</label>
							{fields.map(({ key, name, fieldKey, ...restField }) => (
								<Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="start">
									<Form.Item
										{...restField}
										name={[name, 'material']}
										fieldKey={name}
										rules={[{ required: true, message: 'Please input curb material!' }]}
									>
										<Input placeholder="Material" />
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, 'length']}
										fieldKey={[name, 'length']}
										rules={[{ required: true, message: 'Please input curb length!' }]}
									>
										<Input placeholder="Largo" type="number" />
									</Form.Item>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							))}
							<Form.Item>
								<Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
									Añadir Bordillo
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={loading}>
						Crear Segmento
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default CreateSegmentForm;
