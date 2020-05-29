#include "ofApp.h"
#define GROUP_SIZE 12

float angle = 360;
float max_size = 250;
// Array de vetores
std::vector<ofVec2f> group_a(0);
std::vector<ofVec2f> group_b(0);
ofVec2f offset_a;
ofVec2f offset_b;
ofVec2f radius_a;
ofVec2f radius_b;
float rotation_a = 1;
float rotation_b = 1.25;

//--------------------------------------------------------------
void ofApp::setup(){
    ofEnableSmoothing();
    ofEnableAlphaBlending();
    ofSetBackgroundAuto(false);
    ofBackground(0, 0, 200);
    ofSetLineWidth(4);
    radius_a.set(1, 1);
    radius_b.set(1, 1);
    for (int i = 0; i < GROUP_SIZE; i++) {
        float a = -( i * ( angle/GROUP_SIZE ) );
        ofVec2f v1, v2;
        v1.set(1, 0);
        v2.set(1, 0);
        v1.rotate(a);
        v2.rotate(a);
        auto first_a = group_a.begin();
        auto first_b = group_b.begin();
        group_a.insert(first_a, v1);
        group_b.insert(first_b, v2);
    }
}

//--------------------------------------------------------------
void ofApp::update(){
    float t = ofGetElapsedTimef()*0.8;
    
    for (int i = 0; i < group_a.size(); i++) {
        group_a[i].rotate(rotation_a);
        group_b[i].rotate(rotation_b);
    }
    
    offset_a.x = sin(t);
    offset_a.y = sin(180+t*0.5);
    
    offset_b.x = sin(t*1.5);
    offset_b.y = sin(t);
    
    radius_a.x = ofMap(sin(t*1.5), -1, 1, 0.5, 1);
    radius_a.y = ofMap(sin(t), -1, 1, 0.5, 1);
    
    radius_b.x = ofMap(sin(t), -1, 1, 0.5, 1);
    radius_b.y = ofMap(sin(t*1.5), -1, 1, 0.5, 1);
}

//--------------------------------------------------------------
void ofApp::draw(){
    ofEnableBlendMode(OF_BLENDMODE_ALPHA);
    ofSetColor(0, 0, 200, 80);
    ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
//    ofEnableBlendMode(OF_BLENDMODE_MULTIPLY);
//    ofSetColor(110, 110, 200);
//    ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
//    ofEnableBlendMode(OF_BLENDMODE_ALPHA);
    
    ofTranslate(ofGetWidth()/2, ofGetHeight()/2);
    
    for (int i = 0; i < group_a.size(); i++) {
        ofVec2f size_a = radius_a.getScaled(max_size);
        ofVec2f size_b = radius_b.getScaled(max_size);
        ofSetColor(250);
        float a_x = ofMap(offset_a.x + group_a[i].x, -2, 2, -size_a.x, size_a.y);
        float a_y = ofMap(offset_a.y + group_a[i].y, -2, 2, -size_a.x, size_a.y);
        float b_x = ofMap(offset_b.x + group_b[i].x, -2, 2, -size_b.x, size_b.y);
        float b_y = ofMap(offset_b.y + group_b[i].y, -2, 2, -size_b.x, size_b.y);
        ofDrawCircle(a_x, a_y, 3);
        ofDrawCircle(b_x, b_y, 3);
        ofDrawLine(a_x, a_y, b_x, b_y);
    }
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){

}
