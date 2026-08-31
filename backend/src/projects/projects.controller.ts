import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest {
  user: {
    sub: string;
    email: string;
  };
}

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(@Request() req: AuthenticatedRequest) {
    return this.projectsService.findByUserId(req.user.sub);
  }

  @Post()
  async createProject(@Request() req: AuthenticatedRequest, @Body() data: { name: string; description: string; font: string; bgColor: string }) {
    return this.projectsService.create(req.user.sub, data);
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }

  @Put(':id')
  async updateProject(@Param('id') id: string, @Body() data: Partial<{ name: string; description: string; font: string; bgColor: string }>) {
    return this.projectsService.update(id, data);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }

  @Post(':id/tasks')
  async addTask(@Param('id') projectId: string, @Body() data: { title: string; description: string; status: string }) {
    const taskId = `task-${Date.now()}`;
    return this.projectsService.addTask(projectId, { id: taskId, ...data });
  }

  @Put(':id/tasks/:taskId')
  async updateTask(
    @Param('id') projectId: string,
    @Param('taskId') taskId: string,
    @Body() data: Partial<{ title: string; description: string; status: string }>,
  ) {
    return this.projectsService.updateTask(projectId, taskId, data);
  }

  @Delete(':id/tasks/:taskId')
  async deleteTask(@Param('id') projectId: string, @Param('taskId') taskId: string) {
    return this.projectsService.deleteTask(projectId, taskId);
  }
}